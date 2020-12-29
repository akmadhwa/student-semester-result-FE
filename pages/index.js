import withAuth from "../components/withAuth";
import Layout from "../components/LayOut";
import { userRoles } from "../config/constant";
import StudentDashboard from "../components/StudentDashboard";
import AdminDashboard from "../components/AdminDashboard";

const Home = ({ userData }) => {
  const { data } = userData;

  return (
    <Layout userData={userData}>
      {data.roles === userRoles.student ? (
        <StudentDashboard userData={userData} />
      ) : (
        <AdminDashboard userData={userData} />
      )}
    </Layout>
  );
};

export default withAuth(Home);
