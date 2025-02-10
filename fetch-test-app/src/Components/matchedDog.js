import React, { useState, useEffect } from "react";
import Dog from "./dog";

function MatchedDog(props) {
    return(
        <div className="matched-dog-modal" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <Dog id={props.id} />
        </div>
        
    );
}

export default MatchedDog;