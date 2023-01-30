import { PostItem } from "./PostItem";

export const PostList = ({ posts, title, removePost }) => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      {posts.map((post, index) => (
        <PostItem
          removePost={removePost}
          number={index + 1}
          key={post.id}
          post={post}/>
      ))}
    </>
  );
};
