import { useEffect, useState } from "react";
import GithubAPI, { GithubProfileAPIResult } from "../../../../apis/Github";
import ContentBox from "../../../layout/ContentBox";


const GithubProfile = ({name, avatar_url, public_repos, followers, following, created_at, updated_at}:GithubProfileAPIResult) => {

    const header = ["Avatar","Publieke repositories", "Gevolgd door n* personen", "Volgt n* personen", "Profiel aangemaakt", "Laatse update"];
    return (
        <>
        <table className="table">
            <thead>
                <tr>
                    <th colSpan={header.length} className="text-center">{name}</th>
                </tr>
                <tr>
                    {header.map((v, i) => <th scope="col" key={i}>{v}</th>)} 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src={avatar_url} style={{maxWidth: 400, borderRadius:5}} /></td>
                    <td>{public_repos}</td>
                    <td>{followers}</td>
                    <td>{following}</td>
                    <td>{GithubAPI.sanitizeDate(created_at)}</td>
                    <td>{GithubAPI.sanitizeDate(updated_at)}</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default GithubProfile;