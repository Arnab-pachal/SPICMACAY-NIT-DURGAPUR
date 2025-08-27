import React from 'react';
import TeamImg from '../components/TeamImg';

function Passout25() {
  const members = [
    { name: "Sagar Das", src: "Sagar", post: "President", insta: "", linkedin: "" },
    { name: "Debarpan Bandyopadhay", src: "Debarpan2", post: "Vice President", insta: "", linkedin: "" },
    { name: "Prajnan Karmakar", src: "Prajnan1", post: "General Secretary", insta: "", linkedin: "" },
    { name: "Bedabrata Brahma", src: "Bedabrata1", post: "Assistant General Secretary", insta: "", linkedin: "" },
    { name: "Antara Shaw", src: "Antara", post: "Assistant General Secretary and IT wing head", insta: "", linkedin: "" },
    { name: "Sohan Bera", src: "Sohan", post: "Treasurer", insta: "", linkedin: "" },
    { name: "Alangkrita Mandal", src: "Alangkrita", post: "Treasurer", insta: "", linkedin: "" },
    { name: "Soumyadeep Mahato", src: "Soumyadip", post: "Ops Head", insta: "", linkedin: "" },
    { name: "Soham Singha", src: "Soham", post: "Ops Head", insta: "", linkedin: "" },
    { name: "Souro Chatterjee", src: "Souro1", post: "Sponsorship Head", insta: "", linkedin: "" },
    { name: "Satarupa Ray", src: "Satarupa ray", post: "Sponsorship Head", insta: "", linkedin: "" },
    { name: "Chandra Prakash Singh", src: "CP", post: "Publicity Head and Content Wing Head", insta: "", linkedin: "" },
    { name: "Satarupa Roy", src: "Satarupa roy", post: "Publicity Head", insta: "", linkedin: "" },
    { name: "Jai Khanna", src: "Jai khanna", post: "ATH Head and Content Wing Head", insta: "", linkedin: "" },
    { name: "Madhurima Mondal", src: "Madhurima", post: "ATH Head and Dance Wing Head", insta: "", linkedin: "" },
    { name: "Prerna Sharma", src: "Prerna", post: "Dance wing Head", insta: "", linkedin: "" },
    { name: "Subhajeet Mukherjee", src: "Subhajit", post: "Music wing Head", insta: "", linkedin: "" },
    { name: "Anusurya Bhowmick", src: "Anusurya", post: "Music wing Head", insta: "", linkedin: "" },
    { name: "Hiresh Shah", src: "Hiresh2", post: "Art wing Head", insta: "", linkedin: "" },
    { name: "Sujata Rajak", src: "Sujata", post: "Art wing Head", insta: "", linkedin: "" },
    { name: "Aditya Singh Bisht", src: "Aditya", post: "IT wing Head", insta: "", linkedin: "" },
    { name: "Arjo Kundu", src: "Arjo", post: "IT wing Head", insta: "", linkedin: "" },
    { name: "Aniruddha Bandyopadhyay", src: "Aniruddha", post: "IT wing Head", insta: "", linkedin: "" },
    { name: "Aniket Ghosh", src: "Aniket", post: "Music wing", insta: "", linkedin: "" },
    { name: "Aparajita Paul", src: "Aparajita", post: "Art wing", insta: "", linkedin: "" },
    { name: "Sneha Ghosh", src: "Sneha", post: "Content wing", insta: "", linkedin: "" },
    { name: "Mohaimenul Hok Porag", src: "Porag", post: "Music wing", insta: "", linkedin: "" },
    { name: "Soumyajit Majumdar", src: "Soumyajit1", post: "Music wing", insta: "", linkedin: "" },
    { name: "Subhabrata Das", src: "Subhabrata", post: "IT wing", insta: "", linkedin: "" },
    { name: "Meghna Bhattacharya", src: "Meghna", post: "Content wing", insta: "", linkedin: "" }
  ];
  
  return (
    <>
      {members.map((member, idx) => (
        <TeamImg
          key={idx}
          year="2021"
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

export default Passout25;
