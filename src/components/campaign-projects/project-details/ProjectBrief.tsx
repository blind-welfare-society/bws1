const ProjectBrief = (props: any) => { 
    
    return (
        <div className="project-brief-area pt-30 rel z-1" id="project-tab">
            <div className="project_content">
                <div dangerouslySetInnerHTML={{ __html: props.video_content }}></div>
                <div dangerouslySetInnerHTML={{ __html: props.project_content }}></div>
            </div>
        </div>
    )
}

export default ProjectBrief;