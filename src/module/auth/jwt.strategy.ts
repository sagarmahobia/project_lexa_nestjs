import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtSecret } from "../../contstants.k";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecret
    });
  }

  //used by passport to convert the payload into a user object
  async validate(payload: any) {
    return { id: payload.id, name: payload.name, email: payload.email, role: payload.role };
  }
}
