import { getMemberLoyalty } from "../api/member";

export const SPX_GUEST_COOKIE_NAME = 'spx-guest';
export const SPX_GUEST_HEADER_NAME = 'spx-guest';

type MemberData = {
  memberId: string;
  dateCreated: Date;
};

export async function fetchGuestMemberLoyalties() {
  const items = retrieveLocalStorageData();
  const memberIds = Object.values(items)
    .map(({ memberId }) => memberId);

  const memberLoyalties = await Promise.all(memberIds.map((id) => getMemberLoyalty(id)));

  return memberLoyalties.filter((loyalty) => !!loyalty);
}

export async function removeGuestMemberLoyalty(memberId: string): MemberData | null {
  const items = retrieveLocalStorageData();
  const target = Object.entries(items).find(([_, value]) => value.memberId === memberId);

  if (!target) {
    console.warn(`Unable to find local stroage data for ${memberId}`)
    return null;
  }

  const [keyToDelete, deletedValue] = target;
  localStorage.removeItem(keyToDelete);

  return deletedValue;
}

function retrieveLocalStorageData(): Record<string, MemberData> {
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
