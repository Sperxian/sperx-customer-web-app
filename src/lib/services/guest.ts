import { getMemberLoyalty } from "../api/member";

export const SPX_GUEST_COOKIE_NAME = 'spx-guest';
export const SPX_GUEST_HEADER_NAME = 'spx-guest';

type MemberData = {
  memberId: string;
  dateCreated: Date;
};

export async function fetchGuestMemberLoyalties() {
  const items: Record<string, MemberData> = retrieveLocalStorageData();
  const memberIds = Object.values(items)
    .map(({ memberId }) => memberId);

  const memberLoyalties = await Promise.all(memberIds.map((id) => getMemberLoyalty(id)));

  return memberLoyalties.filter((loyalty) => !!loyalty);
}

function retrieveLocalStorageData() {
  const items: Record<string, MemberData> = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('spx-loyalty-')) {
      const value = localStorage.getItem(key)
      if (value) {
        items[key] = JSON.parse(value) as MemberData;
      }
    }
  }

  return items;
}
