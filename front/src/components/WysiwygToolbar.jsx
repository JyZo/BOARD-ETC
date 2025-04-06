const WysiwygToolbar = () => {
  return (
    <>
      <div className="ql-formats">
        <select className="ql-size" defaultValue="medium" />
        <select className="ql-font" defaultValue="sans-serif" />
      </div>
      <div className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </div>
      <div className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </div>
      <div className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
        <select className="ql-align" />
      </div>
      <div className="ql-formats">
        <button className="ql-code-block" />
        <button className="ql-link" />
        <button className="ql-image" />
      </div>
      <span className="ql-formats">
        <button className="ql-clean"></button>
      </span>
    </>
  );
};

export default WysiwygToolbar;
