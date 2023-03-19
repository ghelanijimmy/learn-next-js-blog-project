import classes from "./hero.module.css";
import Image from "next/image";
export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="https://media.licdn.com/dms/image/C4E03AQEs_8vqYVYGJw/profile-displayphoto-shrink_800_800/0/1593535364340?e=2147483647&v=beta&t=3-8SC8bRvXp5hYSkGrYp8emsUp-EaxprF29S8kaLcWY"
          alt="Profile Image"
          width={300}
          height={300}
        />
      </div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1>Hi, I'm Jimmy</h1>
      <p>
        I am passionate about web development - especially frontend frameworks
        like React or NextJs
      </p>
    </section>
  );
}
