import React from "react";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, otherClasses, containerClasses }: Props) => {
  return <div className={`relative ${containerClasses}`}>
    
  </div>;
};

export default Filter;
