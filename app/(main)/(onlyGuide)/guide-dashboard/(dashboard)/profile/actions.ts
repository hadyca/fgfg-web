"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_GUIDE_PROFILE } from "./queries";
import { redirect } from "next/navigation";
import {
  addressSchema,
  birthdateSchema,
  fullnameSchema,
  guidePhotosSchema,
  heightSchema,
  languageSchema,
  phoneSchema,
} from "./schema";

export async function updateFullanme(formData: FormData) {
  const data = {
    fullname: formData.get("fullname"),
  };

  const result = fullnameSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        fullname: result.data.fullname,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updateBirthdate(formData: FormData) {
  const data = {
    birthdate: formData.get("birthdate"),
  };

  const result = birthdateSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        birthdate: result.data.birthdate,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updateHeight(formData: FormData) {
  const data = {
    height: formData.get("height"),
  };

  const result = heightSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        height: result.data.height,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
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
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        language: result.data.language,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updateAddress(formData: FormData) {
  const data = {
    address: formData.get("address"),
  };

  const result = addressSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        address: result.data.address,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updatePhone(formData: FormData) {
  const data = {
    phone: formData.get("phone"),
  };

  const result = phoneSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        phone: result.data.phone,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
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
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: { editGuideProfile },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        guidePhotos: result.data.guidePhotos,
      },
    });
    if (!editGuideProfile.ok) {
      redirect("/404");
    }
    return;
  }
}
