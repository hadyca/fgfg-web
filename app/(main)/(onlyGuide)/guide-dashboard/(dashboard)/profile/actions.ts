"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_GUIDE_PROFILE } from "./queries";
import {
  addressSchema,
  birthdateSchema,
  fullnameSchema,
  guideIntroSchema,
  guidePhotosSchema,
  heightSchema,
  languageSchema,
  personalitySchema,
  phoneSchema,
  pickupPlaceSchema,
} from "./schema";

export async function updateFullname(formData: FormData) {
  const data = {
    fullname: formData.get("fullname"),
  };

  const result = fullnameSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        fullname: result.data.fullname,
      },
    });
    return { ok, error };
  }
}

export async function updateBirthdate(formData: FormData) {
  const data = {
    birthdate: formData.get("birthdate"),
  };

  const result = birthdateSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        birthdate: result.data.birthdate,
      },
    });
    return { ok, error };
  }
}

export async function updateHeight(formData: FormData) {
  const data = {
    height: formData.get("height"),
  };

  const result = heightSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        height: result.data.height,
      },
    });
    return { ok, error };
  }
}

export async function updateLanguage(formData: FormData) {
  const data = {
    language: formData.get("language")
      ? JSON.parse(formData.get("language") as string)
      : null,
  };

  const result = languageSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        language: result.data.language,
      },
    });
    return { ok, error };
  }
}

export async function updateAddress(formData: FormData) {
  const data = {
    address: formData.get("address"),
  };

  const result = addressSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        address: result.data.address,
      },
    });
    return { ok, error };
  }
}

export async function updatePhone(formData: FormData) {
  const data = {
    phone: formData.get("phone"),
  };

  const result = phoneSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        phone: result.data.phone,
      },
    });
    return { ok, error };
  }
}

export async function updateGuidePhotos(formData: FormData) {
  const data = {
    guidePhotos: formData.get("guidePhotos")
      ? JSON.parse(formData.get("guidePhotos") as string)
      : null,
  };

  const result = guidePhotosSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        guidePhotos: result.data.guidePhotos,
      },
    });

    return { ok, error };
  }
}

export async function updatePersonality(formData: FormData) {
  const data = {
    personality: formData.get("personality"),
  };

  const result = personalitySchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        personality: result.data.personality,
      },
    });
    return { ok, error };
  }
}

export async function updateGuideIntro(formData: FormData) {
  const data = {
    guideIntro: formData.get("guideIntro"),
  };

  const result = guideIntroSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        guideIntro: result.data.guideIntro,
      },
    });
    return { ok, error };
  }
}

export async function updatePickupPlace(formData: FormData) {
  const data = {
    pickupPlaceMain: formData.get("pickupPlaceMain"),
    pickupPlaceLat: formData.get("pickupPlaceLat"),
    pickupPlaceLng: formData.get("pickupPlaceLng"),
    pickupPlaceDetail: formData.get("pickupPlaceDetail"),
  };

  const result = pickupPlaceSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        pickupPlaceMain: result.data.pickupPlaceMain,
        pickupPlaceLat: result.data.pickupPlaceLat,
        pickupPlaceLng: result.data.pickupPlaceLng,
        pickupPlaceDetail: result.data.pickupPlaceDetail,
      },
    });
    return { ok, error };
  }
}

export async function updateIsActive(isActive: boolean) {
  const {
    data: {
      editGuideProfile: { ok, error },
    },
  } = await client.mutate({
    mutation: EDIT_GUIDE_PROFILE,
    variables: {
      isActive: isActive,
    },
  });
  return { ok, error };
}
