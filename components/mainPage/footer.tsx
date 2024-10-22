import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary py-8">
      <div className="container mx-auto text-center">
        <p className="text-lg">&copy; 2024 FGFG. All rights reserved.</p>

        <p className="text-sm mt-2">
          <Link href={"/policies/terms-and-conditions"}>이용약관</Link> |
          <Link href={"/policies/privacy-policy"}> 개인정보취급방침</Link> |
          <Link href={"/policies/refund-policy"}> 환불정책</Link>
        </p>
      </div>
    </footer>
  );
}
