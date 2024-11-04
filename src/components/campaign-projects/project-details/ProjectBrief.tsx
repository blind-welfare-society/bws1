import PaymentMods from "@/components/common/PaymentMods";
const ProjectBrief = (props: any) => { 
    
    return (
        <div className="project-brief-area pb-50 pt-30 rel z-1" id="projectTab">
            <div className="project_content">
                <h3 className="text-center">Story</h3>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%" }}>
                <iframe
                    src="https://www.youtube.com/embed/07XNgv6Yc2Y"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Embedded YouTube Video"
                ></iframe>
                </div>
                <div dangerouslySetInnerHTML={{ __html: props.project_content }}></div>
                
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.project_description }}></div>
            <PaymentMods />
        </div>
    )
}

export default ProjectBrief;