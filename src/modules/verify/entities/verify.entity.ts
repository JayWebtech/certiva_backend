import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Verify {
  @PrimaryGeneratedColumn('uuid')
  verification_id: string;

  @Column()
  certificate_id: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'approved';

  @Column({ nullable: true })
  approval_key: string;

  @CreateDateColumn()
  created_at: Date;
}
