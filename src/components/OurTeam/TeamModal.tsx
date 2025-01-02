import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Post {
  id: number;
  name: string;
  designation: string;
  image: string;
  description: string;
}

interface TeamModalProps {
  isOpen: boolean;
  closeModal: () => void;
  post: Post | null;
}

const TeamModal: React.FC<TeamModalProps> = ({ isOpen, closeModal, post }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !post) return null; // Ensure modal doesn't render unnecessarily

  return (
    <div className="modal" onClick={closeModal} aria-hidden="true">
        <div className="modal-dialog" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description" onClick={(e) => e.stopPropagation()} ref={modalRef} tabIndex={-1}>
            <div className="modal-content">
                <div className="modal-header">
                    <button className="modal-close" onClick={closeModal} aria-label="Close">&times;</button>
                </div>
                <div className="modal-body">
                    <div className="team-popup-inner">
                        <div className="popup-pic">
                        <Image src={post.image} width={150} height={150} alt={post.name} />
                        <h4 className="">{post.name}</h4>
                        <p>{post.designation}</p>
                        </div>
                        <div className="popup-data">
                            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default TeamModal;
