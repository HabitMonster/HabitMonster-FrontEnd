// import React from 'react';
// import styled from 'styled-components';
// import PropTypes from 'prop-types';

// const NavigationTab = (props) => {
//   const { tabTitle, linkTo, activeClass } = props;

//   return (
//     <NavButtonWrap>
//       <NavButtonItem>
//         {/* <NavButton to="/mypage" activeClassName="active"> */}
//         <NavButton to={linkTo} activeClassName={activeClass}>
//           {tabTitle}
//         </NavButton>
//       </NavButtonItem>
//       <NavButtonItem>
//         <NavButton to="/mypage/history" activeClassName="active">
//           히스토리
//         </NavButton>
//       </NavButtonItem>
//     </NavButtonWrap>
//   );
// };

// export default NavigationTab;

// const AcheiveContainer = styled.div`
//   font-family: var(--font-name-apple);
//   width: 100%;
// `;

// const NavButtonWrap = styled.ul`
//   border-bottom: 1px solid var(--color-deemed2);
//   display: flex;
//   list-style: none;
//   margin: 0;
//   padding: 0;
// `;

// const NavButtonItem = styled.li`
//   display: flex;
//   justify-content: center;
//   list-style: none;
//   width: 50%;
//   height: 34px;
//   position: relative;
// `;

// const NavButton = styled(NavLink)`
//   background-color: transparent;
//   border: 0;
//   border: 1px solid transparent;
//   color: var(--color-deemed);
//   cursor: pointer;
//   font-size: var(--font-micro);
//   font-weight: var(--weight-bold);
//   outline: 0;
//   line-height: 34px;
//   text-decoration: none;

//   &:hover {
//     color: var(--color-main);
//     border-bottom: 3px solid var(--color-main);
//   }

//   &.active {
//     color: var(--color-main);
//     border-bottom: 3px solid var(--color-main);
//   }
// `;
