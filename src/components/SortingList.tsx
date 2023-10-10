import React, { FC, useState } from "react";

type SortingListProps = {
    onClickHandler: (sort: string) => void;
}

const SortingList: FC<SortingListProps> = ({ onClickHandler }) => {
    const [sortingType, setSortingType] = useState("");

    return (
        <div>
            <label htmlFor="sortDropDown">Sortēt: </label>
            <select name="sortDropDown" id="sortDropDown" value={sortingType} onChange={(e) => { setSortingType(e.target.value); onClickHandler(e.target.value); }}>
                <option value="">--</option>
                <option value="descending price">Cena (no augstākās)</option>
                <option value="ascending price">Cena (no zemākās)</option>
                <option value="descending mileage">Nobraukums (no mazākā)</option>
                <option value="ascending mileage">Nobraukums (no lielākā)</option>
                <option value="descending year">Gads (no jaunākās)</option>
                <option value="ascending year">Gads (no vecākās)</option>
            </select>
        </div>
    );
}

export default SortingList;