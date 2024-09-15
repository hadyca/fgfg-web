"use client";

import ErrorText from "@/components/errorText";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { createGuideProfileSchema } from "./schema";
import { CreateGuideProfileType } from "./schema";
import GuideProfileQandA from "@/components/guideProfileQandA";
import { getUploadUrl } from "@/lib/sharedActions";
import { createGuideProfile } from "./actions";

export default function EditGuideProfile() {
  return <h1>가이드 수정 페이지</h1>;
}
