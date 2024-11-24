import Footer from "../footer/footer"
import TaskHeader from "../header-nav/header-nav"
import TaskList from "../task-list/task-list"

const HomePage = ()=>{
    return (
        <div>
            <TaskHeader/>
            <TaskList/>
            <Footer/>
        </div>
    )
}
export default HomePage