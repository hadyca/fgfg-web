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
import { getTranslations } from "next-intl/server";

export async function updateFullname(formData: FormData) {
  const t = await getTranslations();
  const data = {
    fullname: formData.get("fullname"),
  };

  const result = fullnameSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    birthdate: formData.get("birthdate"),
  };

  const result = birthdateSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    height: formData.get("height"),
  };

  const result = heightSchema(t).safeParse(data);

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
  const t = await getTranslations();
  const data = {
    language: formData.get("language")
      ? JSON.parse(formData.get("language") as string)
      : null,
  };

  const result = languageSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    address: formData.get("address"),
  };

  const result = addressSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    phone: formData.get("phone"),
  };

  const result = phoneSchema(t).safeParse(data);

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
  const t = await getTranslations();
  const data = {
    guidePhotos: formData.get("guidePhotos")
      ? JSON.parse(formData.get("guidePhotos") as string)
      : null,
  };

  const result = guidePhotosSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    personality: formData.get("personality"),
  };

  const result = personalitySchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    guideIntro: formData.get("guideIntro"),
  };

  const result = guideIntroSchema(t).safeParse(data);

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
  const t = await getTranslations();

  const data = {
    pickupPlaceMain: formData.get("pickupPlaceMain"),
    pickupPlaceLat: formData.get("pickupPlaceLat"),
    pickupPlaceLng: formData.get("pickupPlaceLng"),
    pickupPlaceDetail: formData.get("pickupPlaceDetail"),
  };

  const result = pickupPlaceSchema(t).safeParse(data);

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
