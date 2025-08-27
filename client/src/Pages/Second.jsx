import React from 'react';
import TeamImg from '../components/TeamImg';

function Second() {
  const members = [
   {name:"Arnab Pachal",src:"arnab",insta:"https://www.instagram.com/pachalarnab/",linkedin:"https://www.linkedin.com/in/arnab-pachal-0b1a1b1a4/" , post:"IT Wing Head"},
  ];

  return (
    <>
      {members.map((member, idx) => (
        <TeamImg
          key={idx}
          year="2024"
          name={member.name}
          src={member.src}
          insta={member.insta}
          linkedin={member.linkedin}
        />
      ))}
    </>
  );
}



export default Second;
