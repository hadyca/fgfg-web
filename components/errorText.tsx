interface ErrorTextProps {
  text: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return <div className="text-destructive font-medium">{text}</div>;
}
