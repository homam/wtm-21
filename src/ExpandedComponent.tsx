import React from "react";
import { Attendee } from "./Attendee";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  width: 100%;
`;
const LeftDiv = styled.div`
  width: 300px;
  /* outline: solid 1px blue; */
`;
const RightDiv = styled.div`
  /* width: 70%; */
  margin-left: 1em;
  flex-grow: 1;
  flex-shrink: 1;
  /* outline: solid 1px red; */
`;
const ContactDiv = styled.div`
  margin-bottom: 1ex;
`;
const BioDiv = styled.div`
  margin-bottom: 1ex;
  white-space: pre-wrap;
`;

function List({ title, data }: { title: string; data: string[] }) {
  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {data.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export function ExpandedComponent({ data }: { data: Attendee }) {
  const globe = data.online.find((o) => o.site === "globe");
  const linked_in = data.online.find((o) => o.site === "linkedin");
  const facebook = data.online.find((o) => o.site === "facebook");
  const twitter = data.online.find((o) => o.site === "twitter");
  return (
    <MainDiv>
      <LeftDiv>
        <div>
          <img
            alt=""
            style={{ width: 300, height: 300 }}
            src={data.photo_url}
          />
        </div>
        <h2>{data.name}</h2>
        <h3>{data.job_title}</h3>
        <h3>
          {data.company}{" "}
          {!!globe && (
            <a href={globe.address} target="_blank" rel="noreferrer">
              <img
                style={{ verticalAlign: "bottom" }}
                alt=""
                src="https://img.icons8.com/material-rounded/24/000000/external-link.png"
              />
            </a>
          )}
        </h3>
        {!!linked_in && (
          <ContactDiv>
            <a href={linked_in.address} target="_blank" rel="noreferrer">
              <img
                style={{ verticalAlign: "middle" }}
                alt=""
                src="https://img.icons8.com/color/40/000000/linkedin.png"
              />
              {linked_in.address}
            </a>
          </ContactDiv>
        )}
        {!!twitter && (
          <ContactDiv>
            <a href={twitter.address} target="_blank" rel="noreferrer">
              <img
                style={{ verticalAlign: "middle" }}
                alt=""
                src="https://img.icons8.com/color/40/000000/twitter.png"
              />
              {twitter.address.replace("@@", "@")}
            </a>
          </ContactDiv>
        )}
        {!!facebook && (
          <ContactDiv>
            <a href={facebook.address} target="_blank" rel="noreferrer">
              <img
                style={{ verticalAlign: "middle" }}
                alt=""
                src="https://img.icons8.com/color/40/000000/facebook-new.png"
              />
            </a>
          </ContactDiv>
        )}
        {!!data.phone && (
          <ContactDiv>
            <a
              href={`https://wa.me/${data.phone.replace(/\s|\+|\(|\)/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                style={{ verticalAlign: "middle" }}
                alt=""
                src="https://img.icons8.com/color/40/000000/whatsapp.png"
              />
              {data.phone}
            </a>
          </ContactDiv>
        )}
        {!!data.address && <ContactDiv>{data.address}</ContactDiv>}
      </LeftDiv>
      <RightDiv>
        <List data={data.business_category} title="Business Categoies" />
        <List data={data.services} title="Services" />
        <List data={data.markets} title="Markets" />
        <BioDiv>{data.bio}</BioDiv>
      </RightDiv>
    </MainDiv>
  );
}
