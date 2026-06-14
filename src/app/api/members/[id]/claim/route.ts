import apiClient from "@/lib/api/client";
import { SPX_GUEST_COOKIE_NAME, SPX_GUEST_HEADER_NAME } from "@/lib/services/guest";
import { MemberLoyalty } from "@/types/domain";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: memberId } = await params
  const guestId = req.cookies.get(SPX_GUEST_COOKIE_NAME)?.value;

  try {
    const headers = { [SPX_GUEST_HEADER_NAME]: guestId }
    const { data } = await apiClient.post<MemberLoyalty>(`/customer/members/${memberId}/loyalty/claim`, {}, { headers });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to claim member', error)
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        error.response.data,
        {
          status: error.response.status,
        },
      );
    }
    throw error;
  }
}
