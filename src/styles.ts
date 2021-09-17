import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid rgba(81, 81, 81, 0.21);

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .thead {
      font-weight: bold;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.8rem;
      border-bottom: 1px solid rgba(81, 81, 81, 0.21);
      border-right: 1px solid rgba(81, 81, 81, 0.21);
      overflow: hidden;

      ${
        '' /* In this example we use an absolutely position resizer,
       so this is required. */
      }
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        width: 10px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
      }
    }
  }
  .action-btn-container {
    display: flex;
    margin-bottom: 10px;
  }
  .action-btn {
    display: flex;
    width: 150px;
    border: 1px solid rgba(81, 81, 81, 0.21);
  }
  .columns-list {
    visibility: hidden;
    display: block;
    position: absolute;
    background-color: #fff;
    min-width: 150px;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 20%);
    z-index: 1;
    margin-top: 25px;
    margin-left: 0px;
    transition: transform 2s;
  }
  .columns-list > div {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
  }
  .columns-list > div > input[type='checkbox'] {
    width: 18px;
    height: 18px;
  }
  .action-btn > button {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: none;
    background: none;
    text-align: left;
  }
  .showList {
    visibility: visible;
  }
`;

export default Styles;
