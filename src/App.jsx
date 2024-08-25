import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";
import Tasks from "./components/Tasks";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectedId: undefined,
    projects: [],
    tasks:[]
  });

  function handleAddTask(text){
    setProjectsState((prevState) => {

      const taskId = Math.random();
      const newTask = {
        text:text ,
        projectId:prevState.selectedProjectedId,
        id: taskId,

      };

      return {
        ...prevState,
        tasks:[newTask , ...prevState.tasks]
      };

    });

  }

  function handleDeleteTask(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks:prevState.tasks.filter((task) => task.id !== id),
      };

    });

  }


  function handleDeleteSelectedProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: undefined,
        projects:prevState.projects.filter((project) => project.id !== prevState.selectedProjectedId)
      };

    });
  }


  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: id,
      };

    });
  }

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: null,
      };

    });
  }

  function handleCancelAddProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectedId: undefined,
      };

    });
  }

  function handleAddProject( projectData ) {
    setProjectsState(prevState => {

      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,

      };

      return {
        ...prevState,
        selectedProjectedId :undefined,
        projects: [...prevState.projects , newProject]
      };

    });

  }
  console.log(projectsState);
  
  const selectedProject = projectsState.projects.find(project => project.id ===projectsState.selectedProjectedId);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteSelectedProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectsState.tasks}/>

  if (projectsState.selectedProjectedId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />

  } else if (projectsState.selectedProjectedId === undefined) {
    content = (<NoProjectSelected onStartAddProject={handleStartAddProject} />)
  }


  return (
    <main className="h-screen my-8 flex gap-8 ">
      
      <ProjectsSidebar onStartAddProject={handleStartAddProject}
       projects={projectsState.projects}
       onSelectProject={handleSelectProject} 
       selectedProjectedId={projectsState.selectedProjectedId} />

      {content}
    </main>
  );
}

export default App;
