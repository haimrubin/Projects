package components;
/**
 * @author HaimRubin-209467281 & MatanFadida-315585505
 * <p>fields:
 * <br>branch - object of branch to creation new object ({@link}Branch)
 * <br>CopyBranch - to return the new branch
 */
public class ProxyBranch {
	Branch branch;
	public ProxyBranch() {
		branch = new Branch();
	}
	public Branch CopyBranch() {
		return branch;
	}
}
