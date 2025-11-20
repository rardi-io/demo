import { Clock, CheckCircle2, AlertTriangle, Loader2, X } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface Issue {
  id: string;
  title: string;
  location: string;
  status: 'active' | 'resolving' | 'resolved' | 'ignored';
  timestamp: Date;
  severity: 'critical' | 'warning' | 'info';
}

interface IssueHistoryProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onSelectIssue: (issue: Issue) => void;
  onIgnoreIssue: (issueId: string) => void;
}

export function IssueHistory({ issues, selectedIssue, onSelectIssue, onIgnoreIssue }: IssueHistoryProps) {
  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'resolving':
        return <Loader2 className="h-4 w-4 text-orange-500 animate-spin" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'ignored':
        return <X className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Issue['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="destructive">Active</Badge>;
      case 'resolving':
        return <Badge variant="outline" className="border-orange-500 text-orange-500">Resolving</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="border-green-500 text-green-500">Resolved</Badge>;
      case 'ignored':
        return <Badge variant="outline" className="text-muted-foreground">Ignored</Badge>;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-80 border-r bg-muted/30 flex flex-col">
      {/* Header */}
      <div className="h-16 px-4 border-b flex flex-col justify-center">
        <h2 className="font-semibold">Issue History</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {issues.length} {issues.length === 1 ? 'issue' : 'issues'} tracked
        </p>
      </div>

      {/* Issues List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className={cn(
                "relative rounded-lg border transition-all",
                selectedIssue?.id === issue.id
                  ? "bg-background border-primary shadow-sm"
                  : "bg-background/50 hover:bg-background"
              )}
            >
              <button
                onClick={() => onSelectIssue(issue)}
                className="w-full text-left p-3"
              >
                <div className="flex items-start gap-2 mb-2">
                  {getStatusIcon(issue.status)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate pr-8">{issue.title}</h3>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {issue.location}
                </p>
                
                <div className="flex items-center justify-between">
                  {getStatusBadge(issue.status)}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatTime(issue.timestamp)}
                  </div>
                </div>
              </button>
              
              {/* Ignore Button */}
              {issue.status !== 'ignored' && issue.status !== 'resolved' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onIgnoreIssue(issue.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Stats */}
      <div className="p-4 border-t bg-background/50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-semibold text-destructive">
              {issues.filter(i => i.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-orange-500">
              {issues.filter(i => i.status === 'resolving').length}
            </div>
            <div className="text-xs text-muted-foreground">Resolving</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-500">
              {issues.filter(i => i.status === 'resolved').length}
            </div>
            <div className="text-xs text-muted-foreground">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
}