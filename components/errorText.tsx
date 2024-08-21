interface ErrorTextProps {
  text: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return <span className="text-red-500 font-medium">{text}</span>;
}
