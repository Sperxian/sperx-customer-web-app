import { MemberResponse } from "@/types/domain";
import { EXISTING_MEMBER } from "../stubs";

export async function getMember(_memberId: string): Promise<MemberResponse> {
  return EXISTING_MEMBER.card;
}