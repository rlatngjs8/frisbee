import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 밑에 access용,refresh용 을 하나로 합침
export const JwtAuthGuard = (name: string) => {
  return class JwtAuthGuard extends AuthGuard(name) {
    getRequest(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      return request;
    }
  };
};
// // access 용
// export class GqlAuthAccessGuard extends AuthGuard('access') {
//   // authGuard('access')를 찾음. -> 스트레티지에 있음
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }
// // refresh 용
// export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
//   getRequest(context: ExecutionContext) {
//     const gqlContext = GqlExecutionContext.create(context);
//     return gqlContext.getContext().req;
//   }
// }
