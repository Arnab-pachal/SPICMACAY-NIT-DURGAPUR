import React from 'react';
import TeamImg from '../components/TeamImg';

function PreFinal() {
  const members = [
    { name: "Prasun Biswas", src: "prasun", post: "IT Wing", insta: "", linkedin: "" },
    { name: "Prottoy Saha Hridoy", src: "prottoy", post: "", insta: "", linkedin: "" },
    { name: "Amarnath Kumar", src: "amarnath", post: "", insta: "", linkedin: "" },
    { name: "Sutanuka Das", src: "sutanuka", post: "", insta: "", linkedin: "" },
    { name: "Prerana Banik", src: "prerana", post: "", insta: "", linkedin: "" },
    { name: "Vikash Choudhary", src: "vikash", post: "", insta: "", linkedin: "" },
    { name: "Arnab Maji", src: "maji", post: "", insta: "", linkedin: "" },
    { name: "Arnab Pachal", src: "arnab", post: "IT Wing", insta: "https://www.instagram.com/pachalarnab/", linkedin: "https://www.linkedin.com/in/arnab-pachal-0b1a1b1a4/" },
    { name: "Soumitrisha Dutta", src: "soumi", post: "", insta: "", linkedin: "" },
    { name: "Mayukh Das", src: "mayukh", post: "", insta: "", linkedin: "" },
    { name: "Ananya Adhikary", src: "ananya", post: "", insta: "", linkedin: "" },
    { name: "Antara Mondal", src: "antara", post: "", insta: "", linkedin: "" },
    { name: "Arnab Paul", src: "arnabpaul", post: "", insta: "", linkedin: "" },
    { name: "Mahi Kaithwar", src: "mahi", post: "", insta: "", linkedin: "" },
    { name: "Archita Sarkar", src: "archita", post: "", insta: "", linkedin: "" },
    { name: "Saurav Das", src: "saurav", post: "", insta: "", linkedin: "" },
    { name: "Sayantika Sen", src: "sayantika", post: "", insta: "", linkedin: "" },
    { name: "Puja Basuli", src: "puja", post: "", insta: "", linkedin: "" },
    { name: "Suchandra Nandi", src: "suchandra", post: "", insta: "", linkedin: "" },
    { name: "Sandip Roy", src: "sandip", post: "", insta: "", linkedin: "" },
    { name: "Saheli Mahanty", src: "saheli", post: "", insta: "", linkedin: "" },
    { name: "Aiswarya Mohan", src: "mohan", post: "", insta: "", linkedin: "" },
    { name: "Pradipta Narayan Pal", src: "pradipta", post: "", insta: "", linkedin: "" },
    { name: "Sukanya Naskar", src: "sukanya", post: "", insta: "", linkedin: "" },
    { name: "Swapnil Sinha", src: "swapnil", post: "", insta: "", linkedin: "" },
    { name: "Deba Arpita Karan", src: "deba", post: "", insta: "", linkedin: "" },
    { name: "Anwesha Panda", src: "anwesha", post: "", insta: "", linkedin: "" },
    { name: "Snehanshu Ghatak", src: "snehanshu", post: "", insta: "", linkedin: "" }
  ]
  
   
  ;

  return (
    <>
      {members.map((member, idx) => (
        <TeamImg
          key={idx}
          year="2023"
          name={member.name}
          src={member.src}
          post={member.post} 
          insta={member.insta}
          linkedin={member.linkedin}
        />
      ))}
    </>
  );
}

export default PreFinal;
