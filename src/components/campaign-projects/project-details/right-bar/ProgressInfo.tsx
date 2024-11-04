'use client'
const ProgressInfo = (props: any) => {
    const goatDetail    = props.goatDetail;
    const totalDonar    = goatDetail?.totalDonar || 0;
    const raisedAmount  = goatDetail?.raisedAmount || 0;
    const raisedPercent = goatDetail?.raisedPercent || 0;
    const leftDays      = goatDetail?.leftDays || 0;
    
    return (
        <div className="campaign-progress-info">
            <h4>₹{raisedAmount} <small>raised of  ₹{props.targetAmount} Goal</small></h4>
            <div className="progress">
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${raisedPercent}%` }}>{`${raisedPercent}%` }</div>
            </div>
            <ul>
				<li><strong>{leftDays}</strong> Days left</li>
                <li><strong>{totalDonar}</strong> Supporters</li>
			</ul>
        </div>
    )
}

export default ProgressInfo;