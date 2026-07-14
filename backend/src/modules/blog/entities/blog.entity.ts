import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ObjectIdColumn,
} from 'typeorm';
import { EntityHelper } from 'src/common/utils/entity-helper';
import { ObjectId } from 'mongodb';

export enum BlogStatus {
  Draft = 'draft',
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Entity('blogs')
export class Blog extends EntityHelper {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  userId!: string;

  @Column()
  @Index()
  slug!: string;

  @Column()
  title!: string;

  @Column()
  excerpt!: string;

  @Column()
  blogData!: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ nullable: true })
  category?: {
    main: string[];
    sub: string[];
  };

  @Column({ nullable: true })
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
  };

  @Column({ type: 'string', default: BlogStatus.Draft })
  status!: BlogStatus;

  @Column({ default: false })
  isHidden!: boolean;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ type: Date })
  createdAt: Date = new Date();

  @Column({ type: Date })
  updatedAt: Date = new Date();

  @BeforeInsert()
  setCreatedAt() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
