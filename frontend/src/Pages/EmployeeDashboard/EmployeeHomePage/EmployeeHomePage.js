import CookieUtils from "../../../components/Cookie/Cookies";

const EmployeeHomePage = () => {
  const token = CookieUtils.getCookies('adminToken');
  const tokenData = JSON.parse(atob(token.split('.')[1]));

  const Role = tokenData.role;


  return (
    <div>
      <div className="welcome-container">
        <h1 className='welcome-dummy-text'>Welcome to {Role} Dashboard</h1>
        <p>You have become the makemyvisa member.</p>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
