import React, { Component} from 'react';
import Content_Left from './content_obs_left';
import Content_Middle from './content_obs_middle';
import Content_Right from './content_obs_right';

 const Content =()=>{

  return (
  <div>
      <div className="row">
        <div className="col-xs-12 col-sm-3 col-md-3">
              <Content_Left />
        </div>
        <div className="col-xs-12 col-sm-9 col-md-6">
            <Content_Middle />

        </div>
        <div className="col-xm-12 col-sm-3 col-md-3">
          <Content_Right />
        </div>
      </div>




  </div>
  )
}
export default Content;
