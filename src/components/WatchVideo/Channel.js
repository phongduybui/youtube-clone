import React from "react";
import Skeleton from "react-loading-skeleton";
import { countString } from '../../helpers/convertViewCount';

const Channel = ({ channel }) => {
  return (
    <div className="channel-wrapper">
      <div className="channel-info">
        <div className="channel-info-wrapper">
          {channel ?    
            <img
              className="channel__thumbnail"
              src={channel.snippet.thumbnails.high.url}
              alt=" "
            />
            : <Skeleton circle width="48px" height="48px" />
          }            
          <div className="channel__detail">
            <div className="channel__title">
              {channel 
                ? channel.snippet.title
                : <Skeleton width="140px" />
              }
            </div>
            <div className="channel__subscriber-count">
              {channel
                ? countString(channel.statistics.subscriberCount) +
                  " người đăng ký"
                : <Skeleton width="70px" />
              }
            </div>
          </div>
        </div>
        {channel 
          ? <button className="btn-subscribe menu__btn">Đăng ký</button>
          : <Skeleton width="90px" height="35px" />
        }
      </div>
    </div>
  );
};

export default Channel;
