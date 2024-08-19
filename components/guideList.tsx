interface Guide {
  __typename: string;
  id: number;
  fullname: string;
}

interface GuideProps {
  initialGuides: Guide[];
}

export default function GuideList({ initialGuides }: GuideProps) {
  return (
    <div>
      {initialGuides.map((guide) => (
        <div key={guide.id}>{guide.fullname}</div>
      ))}
    </div>
  );
}
