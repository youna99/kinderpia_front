import React from 'react';
import '../styles/common/Footer.scss';

export default function Footer() {
  return (
    <footer>
      <div className="inner">
        <div className="footer-info">
          <a
            href="https://github.com/SeSAC-3rd-Kinderpia"
            title="킨더피아 깃허브로 이동"
          >
            <i className="xi-github-alt"></i>
            <span className="footer-infotxt">Github</span>
          </a>
        </div>
        <p className="copyright">
          &copy;
          <span className="this-year">{new Date().getFullYear()}</span>
          킨더피아
        </p>
      </div>
    </footer>
  );
}
