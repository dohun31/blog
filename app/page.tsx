import { BlogPosts } from "app/components/posts";

function add(a: number, b: number) {
  return a + b;
}

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        백도훈 기술블로그
      </h1>
      <p className="mb-4">{`프론트엔드 개발자`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
