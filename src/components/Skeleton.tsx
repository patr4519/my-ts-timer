import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={240}
    height={187}
    viewBox="0 0 240 187"
    backgroundColor="#eef5f9"
    foregroundColor="#eef0e8"
    {...props}
  >
    <rect x="25" y="3" rx="4" ry="4" width="190" height="40" /> 
    <rect x="45" y="48" rx="4" ry="4" width="150" height="40" /> 
    <rect x="0" y="95" rx="4" ry="4" width="118" height="46" /> 
    <rect x="120" y="95" rx="4" ry="4" width="118" height="46" /> 
    <rect x="0" y="145" rx="4" ry="4" width="240" height="40" />
  </ContentLoader>
)

export default Skeleton

