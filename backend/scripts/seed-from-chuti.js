/**
 * Seed Data Migration Script
 * Reads ChuTi_Store/db.json and imports products, users, orders, and interactions into MongoDB
 */
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_JSON_PATH = path.resolve(__dirname, '../../../ChuTi_Store/db.json');

async function seedData() {
  console.log('--- BẮT ĐẦU DI TRÚ DỮ LIỆU TỪ CHUTI_STORE SANG MONGODB ---');

  if (!fs.existsSync(DB_JSON_PATH)) {
    console.error(`Không tìm thấy file nguồn: ${DB_JSON_PATH}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(DB_JSON_PATH, 'utf-8');
  const sourceDb = JSON.parse(rawData);

  console.log(`Đã đọc ${sourceDb.products?.length || 0} sản phẩm và ${sourceDb.users?.length || 0} người dùng.`);

  let client;
  try {
    client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    console.log(`[CONNECTED] Đã kết nối thành công tới MongoDB tại: ${MONGO_URI}`);

    // 1. Seed Products -> Database: cosmetics_products
    const prodDb = client.db('cosmetics_products');
    const prodColl = prodDb.collection('products');
    await prodColl.deleteMany({});

    const formattedProducts = (sourceDb.products || []).map((p) => {
      const discount = Number(p.discount || 0);
      const price = Number(p.price || 0);
      const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price;

      return {
        sku: String(p.id),
        name: p.name,
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        category: p.category || 'skincare',
        brand: p.brand || 'COSMETICA',
        image: p.image || '/img/San Pham/SP1.jpg',
        images: Array.isArray(p.images) && p.images.length ? p.images : [p.image || '/img/San Pham/SP1.jpg'],
        soldCount: Number(p.soldCount || 0),
        totalCount: Number(p.totalCount || 100),
        likeCount: Number(p.likeCount || 0),
        types: Array.isArray(p.types) ? p.types : [],
        ingredients: Array.isArray(p.ingredients) ? p.ingredients : [],
        description: p.description || `${p.name} - Mỹ phẩm chính hãng cung cấp dưỡng chất làm đẹp an toàn cho da.`,
        isHotDeal: discount >= 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    if (formattedProducts.length > 0) {
      await prodColl.insertMany(formattedProducts);
      // Tạo Text Index cho tìm kiếm
      await prodColl.createIndex({ name: 'text', brand: 'text', category: 'text' });
      await prodColl.createIndex({ sku: 1 }, { unique: true });
      await prodColl.createIndex({ category: 1 });
      console.log(`✅ [PRODUCTS] Đã nạp thành công ${formattedProducts.length} sản phẩm vào 'cosmetics_products.products'.`);
    }

    // 2. Seed Users -> Database: cosmetics_users
    const userDb = client.db('cosmetics_users');
    const userColl = userDb.collection('users');
    await userColl.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('123456', salt);

    const formattedUsers = await Promise.all(
      (sourceDb.users || []).map(async (u) => {
        const password = u.password || '123456';
        const passwordHash = await bcrypt.hash(password, salt);

        return {
          email: (u.email || `user${u.id}@cosmetica.vn`).toLowerCase(),
          passwordHash: passwordHash,
          fullName: u.name || u.fullName || 'Khách Hàng',
          phone: u.phone || '0987654321',
          role: u.role || 'CUSTOMER',
          isActive: true,
          addresses: [
            {
              recipientName: u.name || 'Khách Hàng',
              phone: u.phone || '0987654321',
              street: u.address || 'Số 12 Nguyễn Văn Bảo, Phường 4',
              district: 'Gò Vấp',
              city: 'TP. Hồ Chí Minh',
              isDefault: true,
            },
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    if (formattedUsers.length > 0) {
      await userColl.insertMany(formattedUsers);
      await userColl.createIndex({ email: 1 }, { unique: true });
      console.log(`✅ [USERS] Đã nạp thành công ${formattedUsers.length} tài khoản người dùng vào 'cosmetics_users.users'.`);
    }

    // 3. Seed Interactions -> Database: cosmetics_interactions
    const intDb = client.db('cosmetics_interactions');
    const commentColl = intDb.collection('comments');
    await commentColl.deleteMany({});

    const formattedComments = (sourceDb.comments || []).map((c) => ({
      productId: String(c.productId || c.product_id || '1'),
      userId: String(c.userId || '1'),
      userName: c.userName || c.name || 'Khách Hàng Ẩn Danh',
      rating: Number(c.rating || 5),
      comment: c.comment || c.content || 'Sản phẩm tuyệt vời, dùng rất thích!',
      createdAt: new Date(),
    }));

    if (formattedComments.length > 0) {
      await commentColl.insertMany(formattedComments);
      console.log(`✅ [INTERACTIONS] Đã nạp thành công ${formattedComments.length} bình luận vào 'cosmetics_interactions.comments'.`);
    }

    console.log('--- HOÀN TẤT DI TRÚ TOÀN BỘ DỮ LIỆU THÀNH CÔNG ---');
  } catch (err) {
    console.error('Lỗi khi nạp dữ liệu vào MongoDB:', err.message);
    console.info('Gợi ý: Hãy đảm bảo Docker MongoDB đang chạy (docker compose up -d mongodb).');
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedData();
