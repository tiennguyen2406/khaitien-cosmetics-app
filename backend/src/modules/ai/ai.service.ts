import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/entities/product.entity';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

@Injectable()
export class AiService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // 1. Kiểm tra tương tác hoạt chất (Ingredient Safety & Compatibility)
  checkCompatibility(ingredients: string[]): {
    isCompatible: boolean;
    warnings: string[];
    recommendations: string[];
  } {
    const list = (ingredients || []).map((i) => i.toLowerCase().trim());
    const warnings: string[] = [];
    const recommendations: string[] = [];

    const hasRetinol = list.some((i) => i.includes('retinol') || i.includes('tretinoin') || i.includes('retinoid'));
    const hasAHA_BHA = list.some((i) => i.includes('aha') || i.includes('bha') || i.includes('salicylic') || i.includes('glycolic') || i.includes('lactic'));
    const hasVitC = list.some((i) => i.includes('vitamin c') || i.includes('ascorbic'));
    const hasNiacinamide = list.some((i) => i.includes('niacinamide'));
    const hasHA_B5 = list.some((i) => i.includes('hyaluronic') || i.includes('b5') || i.includes('panthenol') || i.includes('centella'));

    if (hasRetinol && hasAHA_BHA) {
      warnings.push(
        '⚠️ Cảnh báo tương kỵ: Không nên dùng chung Retinol và AHA/BHA trong cùng một buổi vì dễ gây quá tải, kích ứng và làm mỏng hàng rào bảo vệ da.'
      );
      recommendations.push(
        '💡 Lời khuyên chuyên gia: Hãy dùng xen kẽ các ngày trong tuần (ví dụ: Thứ 2-4-6 dùng BHA, Thứ 3-5-7 dùng Retinol, Chủ Nhật nghỉ dưỡng ẩm).'
      );
    }

    if (hasVitC && hasAHA_BHA) {
      warnings.push(
        '⚠️ Thận trọng: Vitamin C nguyên chất (L-AA) và AHA/BHA đều có tính acid cao, kết hợp cùng lúc dễ gây đỏ rát da.'
      );
      recommendations.push(
        '💡 Lời khuyên: Dùng Vitamin C vào buổi sáng để tăng hiệu quả kem chống nắng, và dùng AHA/BHA vào buổi tối.'
      );
    }

    if (hasVitC && hasNiacinamide) {
      recommendations.push(
        '💡 Lưu ý tối ưu: Nếu dùng Vitamin C L-AA dạng nồng độ cao cùng Niacinamide, bạn nên thoa cách nhau khoảng 15-20 phút để dưỡng chất hấp thu tối đa.'
      );
    }

    if (hasHA_B5) {
      recommendations.push(
        '✨ Cặp đôi phục hồi vàng: Hyaluronic Acid (HA) kết hợp cùng Vitamin B5/Rau má (Centella) giúp cấp nước sâu và làm dịu da nhạy cảm cực kỳ hiệu quả.'
      );
    }

    return {
      isCompatible: warnings.length === 0,
      warnings,
      recommendations: recommendations.length > 0 ? recommendations : ['Các thành phần này an toàn khi phối hợp trong chu trình dưỡng da.'],
    };
  }

  // 2. Tra cứu RAG và sinh phản hồi tư vấn da liễu
  async consult(userQuery: string, history?: ChatMessage[], skinType?: string) {
    const q = userQuery.toLowerCase();

    // 1. Nhận diện nhu cầu / loại da / hoạt chất
    let detectedCategory = '';
    let searchKeywords: string[] = [];

    if (q.includes('rửa mặt') || q.includes('sạch da') || q.includes('cleanser')) {
      detectedCategory = 'skincare';
      searchKeywords.push('rửa mặt', 'cetaphil', 'dịu nhẹ');
    } else if (q.includes('toner') || q.includes('nước hoa hồng') || q.includes('cân bằng')) {
      detectedCategory = 'toner';
      searchKeywords.push('toner', 'klairs', 'cấp ẩm');
    } else if (q.includes('chống nắng') || q.includes('uv') || q.includes('sunscreen')) {
      detectedCategory = 'suncare';
      searchKeywords.push('chống nắng', 'anessa', 'spf');
    } else if (q.includes('mụn') || q.includes('dầu') || q.includes('bha') || q.includes('lỗ chân lông')) {
      searchKeywords.push('mụn', 'centella', 'bha', 'kiềm dầu');
    } else if (q.includes('khô') || q.includes('ẩm') || q.includes('phục hồi') || q.includes('b5')) {
      searchKeywords.push('cấp ẩm', 'dưỡng ẩm', 'phục hồi', 'b5', 'hyaluronic');
    } else if (q.includes('sáng da') || q.includes('thâm') || q.includes('nám') || q.includes('vitamin c')) {
      searchKeywords.push('sáng da', 'vitamin c', 'trắng');
    }

    // 2. Truy vấn sản phẩm thực tế từ MongoDB RAG
    let filter: any = {};
    if (detectedCategory) {
      filter.category = new RegExp(detectedCategory, 'i');
    }
    if (searchKeywords.length > 0) {
      filter.$or = searchKeywords.map((k) => ({
        $or: [
          { name: { $regex: k, $options: 'i' } },
          { description: { $regex: k, $options: 'i' } },
          { brand: { $regex: k, $options: 'i' } },
          { ingredients: { $regex: k, $options: 'i' } },
        ],
      }));
    }

    let matchingProducts = await this.productModel
      .find(filter)
      .limit(4)
      .select('sku name price originalPrice discount brand image category rating ingredients description')
      .exec();

    // Nếu không khớp từ khóa đặc biệt, gợi ý top sản phẩm bán chạy/deals
    if (matchingProducts.length === 0) {
      matchingProducts = await this.productModel
        .find()
        .sort({ soldCount: -1 })
        .limit(3)
        .select('sku name price originalPrice discount brand image category rating ingredients description')
        .exec();
    }

    // 3. Phân tích tương kỵ thành phần nếu người dùng nhắc tới hoạt chất
    const compatibilityCheck = this.checkCompatibility([userQuery]);

    // 4. Sinh câu trả lời tư vấn chuyên sâu cá nhân hóa
    let reply = '';
    const tips: string[] = [];

    if (q.includes('da dầu') || q.includes('mụn')) {
      reply = `Chào bạn! Với làn da dầu mụn, nguyên tắc quan trọng nhất là **làm sạch dịu nhẹ không gây khô căng** và **kiềm dầu kết hợp làm dịu viêm sưng**.
      
Quy trình gợi ý:
1. **Buổi sáng**: Sữa rửa mặt dịu nhẹ ➡️ Toner cấp ẩm cân bằng pH ➡️ Kem chống nắng phổ rộng ráo mịn không gây bít tắc lỗ chân lông.
2. **Buổi tối**: Tẩy trang làm sạch sâu ➡️ Sữa rửa mặt ➡️ Serum phục hồi (B5/Centella) ➡️ Kem dưỡng ẩm dạng gel mỏng nhẹ.`;
      tips.push('Luôn thoa lại kem chống nắng sau mỗi 3-4 tiếng khi hoạt động ngoài trời.');
      tips.push('Tránh chà xát mạnh khi rửa mặt để không làm vỡ các nốt mụn viêm.');
    } else if (q.includes('da khô') || q.includes('bong tróc')) {
      reply = `Chào bạn! Làn da khô đang thiếu hụt cả nước lẫn màng lipid tự nhiên, khiến da dễ bị xỉn màu và xuất hiện nếp nhăn sớm.
      
Quy trình gợi ý:
1. **Làm sạch**: Dùng sữa rửa mặt có độ pH chuẩn 5.5, giàu Glycerin hoặc Ceramides.
2. **Cấp ẩm tầng sâu**: Đắp lotion mask hoặc vỗ 2-3 lớp toner giàu Hyaluronic Acid khi da còn ẩm.
3. **Khóa ẩm**: Sử dụng kem dưỡng ẩm dạng cream có chứa Ceramide hoặc B5 để củng cố hàng rào lipid.`;
      tips.push('Uống đủ 2 lít nước mỗi ngày để hỗ trợ cấp ẩm từ bên trong cơ thể.');
    } else if (q.includes('retinol') || q.includes('aha') || q.includes('bha')) {
      reply = `Về việc sử dụng các hoạt chất treatment (Retinol, BHA/AHA):
Đây là các hoạt chất vàng giúp tái tạo tế bào và làm sạch sâu lỗ chân lông, tuy nhiên cần bắt đầu từ nồng độ thấp và tần suất giãn cách.`;
      if (compatibilityCheck.warnings.length > 0) {
        reply += `\n\n${compatibilityCheck.warnings.join('\n')}`;
      }
      tips.push('Bắt đầu với tần suất 1-2 lần/tuần trong 2 tuần đầu tiên.');
      tips.push('Bắt buộc phải dùng kem chống nắng SPF 50+ vào ban ngày khi dùng treatment.');
    } else if (q.includes('chống nắng') || q.includes('anessa')) {
      reply = `Kem chống nắng là bước quan trọng nhất bảo vệ da khỏi tia UVA/UVB gây lão hóa sớm và nám sạm. Dưới đây là các dòng chống nắng đỉnh cao được các bác sĩ da liễu khuyên dùng cho bạn:`;
      tips.push('Thoa một lượng khoảng 1 đồng xu cho toàn mặt trước khi ra ngoài 20 phút.');
    } else {
      reply = `Chào bạn! Tôi là **Cosmetica AI Beauty Advisor** - Chuyên viên da liễu số của bạn. Tôi có thể giúp bạn:
- Phân tích và lựa chọn mỹ phẩm phù hợp với tình trạng da (Dầu, Khô, Mụn, Nhạy cảm).
- Kiểm tra độ tương thích và độ an toàn của các hoạt chất mỹ phẩm.
- Gợi ý quy trình Skincare Routine sáng & tối chuẩn khoa học.

Dưới đây là một số sản phẩm chăm sóc da chất lượng cao được ưa chuộng nhất tại Cosmetica dành cho bạn:`;
      tips.push('Hãy cho tôi biết loại da và vấn đề da bạn đang quan tâm nhất nhé!');
    }

    if (compatibilityCheck.recommendations.length > 0) {
      tips.push(...compatibilityCheck.recommendations);
    }

    return {
      reply,
      suggestedProducts: matchingProducts,
      tips,
    };
  }
}
