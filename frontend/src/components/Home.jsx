import BlogList from './BlogList';
import AddBlogForm from './AddBlogForm';
import Togglable from './Togglable';

const Home = ({ user, blogFormRef, handleCreate }) => {
  return (
    <>
      <div className="mb-4">
        <Togglable buttonLabel="New blog" ref={blogFormRef}>
          <AddBlogForm onCreate={handleCreate} />
        </Togglable>
      </div>
      <BlogList />
    </>
  );
};

export default Home;
