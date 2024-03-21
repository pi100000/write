import Editor from "../Editor/Editor";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div
      style={{
        height: "100%",
        margin: "20px",
      }}
    >
      <button>Create New Post</button>
      <div style={{ height: "600px" }}>
        <Editor />
      </div>
    </div>
  );
};

export default Dashboard;
