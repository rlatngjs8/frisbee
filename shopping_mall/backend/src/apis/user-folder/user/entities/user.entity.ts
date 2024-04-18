import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  user_no: number;

  @Column({ unique: true })
  user_id: string;

  @Column()
  name: string;

  @Column()
  profile_img: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  createdAt: string;

  @DeleteDateColumn({ nullable: true, precision: 0 })
  deletedAt: Date;

  // @OneToOne(() => Cart, (cart) => cart.user_no)
  // cart: Cart;

  // @OneToMany(() => Order, (order) => order.user_no)
  // order: Order;

  // @OneToMany(() => Board, (board) => board.user_no)
  // board: Board;

  // @OneToMany(() => BoardComment, (boardComment) => boardComment.user_no)
  // board_comment: BoardComment;

  // @OneToMany(() => BoardReply, (board_reply) => board_reply.user_no)
  // board_reply: BoardReply;

  // @OneToMany(() => Payment, (payment) => payment.user)
  // payment: Payment;
}
