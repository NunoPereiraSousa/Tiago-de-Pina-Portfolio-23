export default function DoubleText({ children, isMobile = false }) {
  return (
    <>
      {!isMobile ? (
        <div className="text-reveal">
          <div className="span-wrapper">
            <div className="first-span">{children}</div>

            <div className="second-span">{children}</div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
