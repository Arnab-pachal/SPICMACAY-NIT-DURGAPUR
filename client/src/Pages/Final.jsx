import React from 'react';
import TeamImg from '../components/TeamImg';

function Final() {
  const members = [
    { name: "Aishika Pal", src: "aishika", post: "Art Wing", insta: "", linkedin: "" },
    { name: "Ananya Chatterjee", src: "ananya", post: "Art & Dance Wing", insta: "", linkedin: "" },
    { name: "Anubhav Mondal", src: "anubhav", post: "Content Wing", insta: "", linkedin: "" },
    { name: "Laxmi Mondal", src: "laxmi", post: "Art Wing", insta: "", linkedin: "" },
    { name: "Durba Sinha", src: "durba", post: "Content Wing", insta: "", linkedin: "" },
    { name: "Ashmita Dhar", src: "ashmita", post: "Dance Wing", insta: "", linkedin: "" },
    { name: "Ishani Sarkar", src: "ishani", post: "Art Wing", insta: "", linkedin: "" },
    { name: "Bishakha Sen", src: "bishakha", post: "Music Wing", insta: "", linkedin: "" },
    { name: "Pratyusha Barman", src: "pratyusha", post: "Dance Wing", insta: "", linkedin: "" },
    { name: "Ojoshmi Dey", src: "ojoshmi", post: "Dance Wing", insta: "", linkedin: "" },
    { name: "Shrestha Mondal", src: "shrestha", post: "Content Wing", insta: "", linkedin: "" },
    { name: "Ritayan Mukherjee", src: "ritayan", post: "Music Wing", insta: "", linkedin: "" },
    { name: "Joyjit Rajbanshi", src: "joyjit", post: "Music Wing", insta: "", linkedin: "" },
    { name: "Samikshya Panda", src: "samikshya", post: "IT & Music Wing", insta: "", linkedin: "" },
    { name: "Abhirup Chattopadhyay", src: "abhirup", post: "Music Wing", insta: "", linkedin: "" },
    { name: "Pratham Nandy", src: "pratham", post: "IT Wing", insta: "", linkedin: "" },
    { name: "Rahul Mondal", src: "rahul", post: "IT Wing", insta: "", linkedin: "" },
    { name: "Lena Joshy M", src: "lena", post: "Dance Wing", insta: "", linkedin: "" },
    { name: "Rubel Gayen", src: "rubel", post: "IT Wing", insta: "", linkedin: "" },
    { name: "Bishal Biswas", src: "bishal", post: "IT Wing", insta: "", linkedin: "" }
  ]
  

  return (
    <>
      {members.map((member, idx) => (
        <TeamImg
          key={idx}
          year="2022"
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


export default Final;
