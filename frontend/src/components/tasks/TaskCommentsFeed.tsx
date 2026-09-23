import React from 'react';
import { useForm } from 'react-hook-form';
import { Send, MessageSquare } from 'lucide-react';
import type { TaskComment } from '../../types/task.types';
import { formatTimeAgo } from '../../utils/formatDate';
import { Button } from '../common/Button';
import { useAppDispatch } from '../../redux/hooks';
import { addCommentAction } from '../../redux/slices/taskSlice';
import { showToast } from '../../redux/slices/uiSlice';

interface TaskCommentsFeedProps {
  taskId: string;
  comments: TaskComment[];
}

interface CommentFormValues {
  content: string;
}

export const TaskCommentsFeed: React.FC<TaskCommentsFeedProps> = ({ taskId, comments }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CommentFormValues>({
    defaultValues: { content: '' },
  });

  const onSubmit = async (data: CommentFormValues) => {
    if (!data.content.trim()) return;
    try {
      await dispatch(addCommentAction({ taskId, content: data.content })).unwrap();
      reset();
      dispatch(showToast({ message: 'Comment added successfully', type: 'success' }));
    } catch (err: any) {
      dispatch(showToast({ message: err || 'Failed to add comment', type: 'error' }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <MessageSquare className="w-4 h-4 text-indigo-600" />
        <h4 className="text-sm font-bold text-slate-900">
          Discussion & Comments ({comments.length})
        </h4>
      </div>

      {/* Comments List */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No comments yet. Start the conversation below.
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      comment.author?.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-300'
                        : 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                    }`}
                  >
                    {comment.author?.name?.slice(0, 2).toUpperCase() || 'U'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-800 text-xs">
                      {comment.author?.name || 'User'}
                    </span>
                    {comment.author?.role === 'ADMIN' ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Employee
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {formatTimeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap pl-8 text-xs leading-relaxed">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Input Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pt-2">
        <textarea
          rows={2}
          placeholder="Write a comment..."
          className="w-full text-xs bg-white text-slate-900 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:border-indigo-600 focus:ring-indigo-100 transition-all resize-none"
          {...register('content', { required: true })}
        />
        <div className="flex justify-end">
          <Button type="submit" size="sm" isLoading={isSubmitting} variant="primary">
            <Send className="w-3 h-3" /> Post Comment
          </Button>
        </div>
      </form>
    </div>
  );
};
