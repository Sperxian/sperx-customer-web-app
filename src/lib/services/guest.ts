import { MemberLoyalty } from "@/types/domain";
import { getMemberLoyalty } from "../api/member";

export const SPX_GUEST_COOKIE_NAME = 'spx-guest';
export const SPX_GUEST_HEADER_NAME = 'spx-guest';

type MemberData = {
  memberId: string;
  dateCreated: Date;
  claimed?: boolean;
};

export async function fetchGuestMemberLoyalties(): Promise<MemberLoyalty[]> {
  const items = retrieveLocalStorageData();
  const guestMemberIds = Object.values(items)
    .filter(({ claimed }) => !claimed)
    .map(({ memberId }) => memberId);

  const memberLoyalties = await Promise.all(guestMemberIds.map((id) => getMemberLoyalty(id)));

  return memberLoyalties.filter((loyalty) => !!loyalty);
}

export function claimGuestMemberLoyalty(memberId: string): MemberData | null {
  const items = retrieveLocalStorageData();
  const target = Object.entries(items).find(([_, value]) => value.memberId === memberId);

  if (!target) {
    console.warn(`Unable to find local storage data for ${memberId}`)
    return null;
  }

  const [key, value] = target;
  // localStorage.removeItem(keyToDelete);
  const newValue = {
    ...value,
    claimed: true,
  };
  localStorage.setItem(key, JSON.stringify(newValue));

  return newValue;
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
