import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PostItem } from "./PostItem";

export const PostList = ({ posts, title, removePost }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Няма постов</h1>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem removePost={removePost} number={index + 1} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};
