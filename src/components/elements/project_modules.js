import React from 'react';
import Fade from 'react-reveal/Fade';
import ProgressiveImage from 'react-progressive-image';

export const ProjectGalleryModule = props => {
  const { images, className, imageClassName } = props;
  images.sort();
  return (
    <div className={className}>
      {images.map((imageUrl, index) => {
        if (!imageUrl.includes('_0')) {
          return (
             <ProjectGalleryImage imageUrl={imageUrl} key={imageUrl} imageClassName={imageClassName}/>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export const ProjectGalleryImage = props => {
  const { imageUrl, imageClassName } = props;

  return (
    <div className={imageClassName}>
        <Fade>
          <ProgressiveImage src={imageUrl} placeholder={null}>
        {(src, loading) => (
            <img style={{ opacity: loading ? 0 : 1, width:'100%' }} src={src} alt={src}/>
        )}
      </ProgressiveImage> 
      </Fade>  
    </div>
  );
};

export const ProjectCreditsModule = props => {
  const { credits, className } = props;
  return (
    <div className={className}>
      {credits.map(credit => {
        return (
          <p key={credit.title}>
            {credit.title}: {credit.name}
          </p>
        );
      })}
    </div>
  );
};

export const ProjectDescriptionModule = props => {
  const { description, id, className } = props;
  return (
    <div className={id} id={className}>
      <p>{description}</p>
    </div>
  );
};
